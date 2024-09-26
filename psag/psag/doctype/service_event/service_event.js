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
    },
    site_address: function(frm) {
        set_address_display(frm);
    },
    checklist: function(frm) {
        pull_checklist(frm);
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

function pull_checklist(frm) {
    if (frm.doc.checklist) {
        if ((frm.doc.checklist_data) && (frm.doc.checklist_data.length > 0)) {
            frappe.confirm(
                __("Soll die Checkliste wirklich zurückgesetzt werden?"),
                function(){
                    // on yes
                    fetch_checklist(frm.doc.checklist);
                },
                function(){
                    // on no: do nothing
                }
            );
        } else {
            fetch_checklist(frm.doc.checklist);
        }
    }
}

function fetch_checklist(checklist) {
    frappe.call({
        "method": "frappe.client.get",
        "args": {
            "doctype": "Checklist",
            "name": checklist
        },
        "callback": function(response) {
            var checklist = response.message;
            cur_frm.clear_table("checklist_data");
            for (var i = 0; i < checklist.checklist_steps.length; i++) {
                var new_step = cur_frm.add_child('checklist_data');
                frappe.model.set_value(new_step.doctype, new_step.name, 'topic', checklist.checklist_steps[i].topic);
                frappe.model.set_value(new_step.doctype, new_step.name, 'description', checklist.checklist_steps[i].description);
                frappe.model.set_value(new_step.doctype, new_step.name, 'input_type', checklist.checklist_steps[i].input_type);
            }
            cur_frm.refresh_field('checklist_data');
        }
    });
}
