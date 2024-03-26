frappe.views.calendar["Service Event"] = {
	field_map: {
		"start": "planned_start",
		"end": "planned_end",
		"id": "name",
		"allDay": "all_day",
		"title": "application_site_name",
		"status": "status",
		"eventColor": "color"
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
			"fieldname": "responsible",
			"options": "Responsible",
			"label": __("Responsible")
		}
	],
	get_events_method: "psag.psag.doctype.service_event.service_event.get_service_events"
}
