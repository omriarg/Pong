from django.db import models

class GameRecord(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    high_score = models.IntegerField(default=0)
    winner = models.CharField(max_length=100, blank=True, null=True)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.high_score}"
