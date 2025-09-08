from rest_framework import serializers
from .models import GameRecord

class GameRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameRecord
        fields = '__all__'
