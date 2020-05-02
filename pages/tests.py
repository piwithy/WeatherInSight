from django.test import TestCase
from django.utils import timezone

from .models import Hits


# Create your tests here.
class ModelTestCase(TestCase):
    def test_hits_counter(self):
        """
        Testing the model of the Hit Counter
        """
        hit = Hits()
        now = timezone.now()
        hit.count = 0
        hit.date_creation = now
        self.assertEqual(hit.count, 0)
        self.assertEqual(hit.date_creation, now)
        self.assertEqual(str(hit), "Hits id=" + str(hit.id))
