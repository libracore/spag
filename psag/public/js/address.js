frappe.ui.form.on('Address', {
    refresh: function(frm) {
        if ((frm.doc.address_line1) && (frm.doc.pincode) && (frm.doc.city)) {
            frm.add_custom_button(__("Locate"), function() {
                set_gps_coordinates(frm);
            });
        }
        
        lock_unlock_gps(frm);
    },
    before_save: function(frm) {
        fetch_gps_coordinates(frm);
    },
    address_line1: function(frm) {
        set_gps_coordinates(frm);
    },
    pincode: function(frm) {
        set_gps_coordinates(frm);
    },
    city: function(frm) {
        set_gps_coordinates(frm);
    },
    manual_gps: function(frm) {
        lock_unlock_gps(frm);
    }
});

function set_gps_coordinates(frm) {
    if (!frm.doc.manual_gps) {
        frappe.call({
            'method': 'psag.psag.utils.get_gps_coordinates',
            'args': {
                'street': frm.doc.address_line1,
                'location': frm.doc.pincode + " " + frm.doc.city
            },
            'callback': function(response) {
                try {
                    var gps_coordinates = response.message['lat'] + ", " + response.message['lon']
                    cur_frm.set_value('gps_coordinates', gps_coordinates);
                } catch (TypeError) {
                    cur_frm.set_value('gps_coordinates', " ");
                }
            }
        });
    }
}

function fetch_gps_coordinates(frm) {
    var gps_coordinates = frm.doc.gps_coordinates;
    if (gps_coordinates) {
        var split = gps_coordinates.split(", ");
        var gps_latitude = split[0];
        var gps_longitude = split[1];
        cur_frm.set_value('gps_latitude', gps_latitude);
        cur_frm.set_value('gps_longitude', gps_longitude);
    } else {
        cur_frm.set_value('gps_latitude', "");
        cur_frm.set_value('gps_longitude', "");
    }
}

function lock_unlock_gps(frm) {
    if (!frm.doc.manual_gps) {
        cur_frm.set_df_property('gps_coordinates', 'read_only', 1);
    } else {
        cur_frm.set_df_property('gps_coordinates', 'read_only', 0);
    }
}
