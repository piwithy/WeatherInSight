import json

from django import template
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter(name='get_type')
def get_type(value):
    return type(value)


@register.filter
def pretty_jsons(value):
    return json.dumps(json.loads(value), indent=4, sort_keys=True)


@register.filter
def pretty_json(value):
    return json.dumps(value, indent=4, sort_keys=True)


@register.filter
def js(obj):
    return mark_safe(json.dumps(obj))


@register.filter
def get_sensor(query_set, sensor):
    return query_set.get(sensor=sensor)
