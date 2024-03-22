frappe.ui.form.on('Customer', {
    before_save(frm) {
		set_gps_coordinates(frm);
		fetch_gps_coordinates(frm);
        }
    }
}

function set_gps_coordinates(frm) {
	frappe.call({
		'method': 'psag.psag.utils.get_gps_coordniates',
		'args': {
			'street': frm.doc.address_line1,
			'location': frm.doc.pincode + frm.doc.city
		},
		'callback': function(response) {
			//~ var gps_coordinates = response.message[1].lat + ", " + response.message[1].lon
			cur_frm.set_value('gps_coordinates', gps_coordinates);
		}
	}
}

function fetch_gps_coordinates(frm) {
	var gps_coordinates = frm.doc.gps_coordinates
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
