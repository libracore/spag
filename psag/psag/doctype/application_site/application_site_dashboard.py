from frappe import _

def get_data():
   return {
      'fieldname': 'application_site',
      'transactions': [
         {
            'label': _("Field Service"),
            'items': ['Maintenance Event']
         }
      ]
   }
