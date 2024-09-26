# Copyright (c) 2021-2024, libracore and Contributors
# License: GNU General Public License v3. See license.txt
import frappe
import requests

@frappe.whitelist()
def get_gps_coordinates(street, location):
    url = "https://nominatim.openstreetmap.org/search?q={street},{location}&format=json&polygon=1&addressdetails=0".format(street=street, location=location)
    response = requests.get(url)
    data = response.json()
    gps_coordinates = None
    if len(data) > 0:
        gps_coordinates = {'lat': data[0]['lat'], 'lon': data[0]['lon']}
    return gps_coordinates
    
@frappe.whitelist()
def get_geographic_environment(facility_name=None, radius=1, address=None, service_events=False):
    data = None
    if frappe.db.exists("Facility", facility_name):
        obj = frappe.get_doc("Facility", facility_name)
        data = {
            'facility': facility_name,
            'gps_lat': obj.gps_latitude,
            'gps_long': obj.gps_longitude
        }
    elif address:
        # find gps from address
        gps = get_gps_coordinates(address, "")
        if gps:
            data = {
                'object': address,
                'gps_lat': gps['lat'],
                'gps_long': gps['lon']
            }
    
    # default of no center is defined
    if not data:
        data = {
            'object': "PSAG",
            'gps_lat': 46.984338787480695,
            'gps_long': 8.411922818855178
        }
    
    if service_events:
        # base data on service events
        data['environment'] = frappe.db.sql("""
            SELECT 
                `tabService Event`.`name` AS `service_event`,
                `tabService Event`.`application_site_name` AS `application_site_name`, 
                `tabService Event`.`gps_latitude` AS `gps_lat`, 
                `tabService Event`.`gps_longitude` AS `gps_long`,
                `tabService Event`.`status` AS `status`,
                `tabService Event`.`address_display` AS `address_display`,
                `tabService Event`.`responsible` AS `responsible`
            FROM `tabService Event`
            WHERE 
                `tabService Event`.`gps_latitude` >= ({gps_lat} - {lat_offset})
                AND `tabService Event`.`gps_latitude` <= ({gps_lat} + {lat_offset})
                AND `tabService Event`.`gps_longitude` >= ({gps_long} - {long_offset})
                AND `tabService Event`.`gps_longitude` <= ({gps_long} + {long_offset})
                AND `tabService Event`.`name` != "{reference}"
                AND `tabService Event`.`status` != "Completed"
                ;
        """.format(reference=facility_name, gps_lat=data['gps_lat'], lat_offset=float(radius),
            gps_long=data['gps_long'], long_offset=(2 * float(radius))
        ), as_dict=True)
    else:
        # pull environment based on facilities
        data['environment'] = frappe.db.sql("""
            SELECT 
                `tabFacility`.`name` AS `facility`, 
                `tabFacility`.`gps_latitude` AS `gps_lat`, 
                `tabFacility`.`gps_longitude` AS `gps_long`
            FROM `tabFacility`
            WHERE 
                `tabFacility`.`gps_latitude` >= ({gps_lat} - {lat_offset})
                AND `tabFacility`.`gps_latitude` <= ({gps_lat} + {lat_offset})
                AND `tabFacility`.`gps_longitude` >= ({gps_long} - {long_offset})
                AND `tabFacility`.`gps_longitude` <= ({gps_long} + {long_offset})
                AND `tabFacility`.`name` != "{reference}"
                ;
        """.format(reference=facility_name, gps_lat=data['gps_lat'], lat_offset=float(radius),
            gps_long=data['gps_long'], long_offset=(2 * float(radius))
        ), as_dict=True)
    
    return data

