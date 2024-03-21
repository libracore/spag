// Copyright (c) 2024, libracore AG and contributors
// For license information, please see license.txt

frappe.ui.form.on('Application Site', {
	customer_address: function(frm) {
		set_address_display_and_gps(frm);
	}
});

function set_address_display_and_gps(frm) {
	frappe.call({
        'method': 'psag.psag.doctype.application_site.application_site.set_address_display_and_gps',
        'args': {
            'address': frm.doc.customer_address
        },
        'callback': function(response) {
            cur_frm.set_value('address_display', response.message);
        }
    });
}
