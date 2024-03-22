// Copyright (c) 2024, libracore AG and contributors
// For license information, please see license.txt

frappe.ui.form.on('Application Site', {
	validate: function(frm) {
		fetch_gps_coordinates(frm);
	},
	customer_address: function(frm) {
		set_address_display_and_gps(frm);
	}
});

function set_address_display_and_gps(frm) {
	if (frm.doc.customer_address) {
		frappe.call({
			'method': 'psag.psag.doctype.application_site.application_site.set_address_display_and_gps',
			'args': {
				'address': frm.doc.customer_address
			},
			'callback': function(response) {
				cur_frm.set_value('address_display', response.message[0]);
				var gps_coordinates = response.message[1].lat + ", " + response.message[1].lon
				cur_frm.set_value('gps_coordinates', gps_coordinates);
			}
		});
	} else {
		cur_frm.set_value('address_display', "");
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
