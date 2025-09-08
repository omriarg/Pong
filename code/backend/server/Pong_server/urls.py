from django.urls import path
from .views import NewGameView, SaveScoreView, FetchScoreView

urlpatterns = [
    path('new-game/', NewGameView.as_view(), name='new-game'),
    path('save-score/', SaveScoreView.as_view(), name='save-score'),
    path('fetch-score/<int:game_id>/', FetchScoreView.as_view(), name='fetch-score'),
]
