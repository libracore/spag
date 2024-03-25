frappe.views.calendar["Service Event"] = {
	field_map: {
		"start": "planned_start",
		"end": "planned_end",
		"id": "name",
		"allDay": "all_day",
		"title": "application_site_name",
		"status": "status",
		"color": "color"
	},
	style_map: {
		"Public": "success",
		"Private": "info"
	},
	get_events_method: "frappe.desk.doctype.event.event.get_events"
}
