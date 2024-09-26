# -*- coding: utf-8 -*-
# Copyright (c) 2024, libracore AG and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
import json

class ServiceEvent(Document):
    pass

@frappe.whitelist()
def get_service_events(doctype, start, end, field_map, filters=None, fields=None):
    field_map = frappe._dict(json.loads(field_map))
    doc_meta = frappe.get_meta(doctype)
    for d in doc_meta.fields:
        if d.fieldtype == "Color":
            field_map.update({
                "color": d.fieldname
            })

    if filters:
        filters = json.loads(filters or '')

    if not fields:
        fields = [field_map.start, field_map.end, field_map.title, 'name']

    if field_map.color:
        fields.append(field_map.color)

    start_date = "ifnull(%s, '0001-01-01 00:00:00')" % field_map.start
    end_date = "ifnull(%s, '2199-12-31 00:00:00')" % field_map.end

    filters += [
        [doctype, start_date, '<=', end],
        [doctype, end_date, '>=', start],
    ]

    return frappe.get_list(doctype, fields=fields, filters=filters)

