// Copyright (c) 2021-2024, libracore AG and contributors
// For license information, please see license.txt
frappe.views.calendar["Service Event"] = {
    field_map: {
        "start": "planned_start",
        "end": "planned_end",
        "id": "name",
        "allDay": "all_day",
        "title": "application_site_name",
        "status": "status",
        "color": "color",
        "child_name": "responsible"
    },
    style_map: {
        "Public": "success",
        "Private": "info"
    },
    color_map: {
        "yellow": "yellow",
        "red": "red"
    },
    filters: [
        {
            "fieldtype": "Link",
            "fieldname": "application_site",
            "options": "Application Site",
            "label": __("Application Site")
        },
        {
            "fieldtype": "Link",
            "fieldname": "customer",
            "options": "Customer",
            "label": __("Customer")
        },
        {
            "fieldtype": "Link",
            "fieldname": "responsible",
            "options": "Responsible",
            "label": __("Responsible")
        }
    ],
    get_events_method: "psag.psag.doctype.service_event.service_event.get_service_events"
}
