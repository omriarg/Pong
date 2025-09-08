from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import GameRecord
from .serializers import GameRecordSerializer

class NewGameView(APIView):
    def post(self, request):
        """Starts a new game."""
        username = request.data.get('username', 'Anonymous')
        game_record = GameRecord.objects.create(username=username)
        return Response({"message": "New game started", "game_id": game_record.id}, status=status.HTTP_201_CREATED)

class SaveScoreView(APIView):
    def post(self, request):
        """Saves the final score of a game."""
        game_id = request.data.get('game_id')
        high_score = request.data.get('high_score')
        winner = request.data.get('winner')

        try:
            game_record = GameRecord.objects.get(id=game_id)
            game_record.high_score = high_score
            game_record.winner = winner
            game_record.save()
            return Response({"message": "Score saved successfully"}, status=status.HTTP_200_OK)
        except GameRecord.DoesNotExist:
            return Response({"error": "Game record not found"}, status=status.HTTP_404_NOT_FOUND)

class FetchScoreView(APIView):
    def get(self, request, game_id):
        """Fetches the game score in case of an interruption."""
        try:
            game_record = GameRecord.objects.get(id=game_id)
            serializer = GameRecordSerializer(game_record)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except GameRecord.DoesNotExist:
            return Response({"error": "Game record not found"}, status=status.HTTP_404_NOT_FOUND)
