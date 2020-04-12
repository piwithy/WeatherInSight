from django import template
import json

register = template.Library()


@register.filter(name='get_type')
def get_type(value):
    return type(value)


@register.filter
def pretty_json(value):
    return json.dumps(value, indent=4, sort_keys=True)
