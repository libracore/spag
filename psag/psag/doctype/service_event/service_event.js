// Copyright (c) 2024, libracore AG and contributors
// For license information, please see license.txt
const default_duration = 1;         // default duration of an event, in hours

frappe.ui.form.on('Service Event', {
    before_save: function(frm) {
        set_address_display(frm);
    },
    planned_start: function(frm) {
        // calculate default end
        var planned_end = new Date((new Date(cur_frm.doc.planned_start)).getTime() + (default_duration * 60*60*1000));
        cur_frm.set_value("planned_end", planned_end);
    }
});

function set_address_display(frm) {
    if (frm.doc.site_address) {
        frappe.call({
            'method': 'psag.psag.doctype.application_site.application_site.set_address_display',
            'args': {
                'address': frm.doc.site_address
            },
            'callback': function(response) {
                cur_frm.set_value('address_display', response.message);
            }
        });
    } else {
        cur_frm.set_value('address_display', "");
    }
}
