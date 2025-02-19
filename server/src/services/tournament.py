from curl_cffi import requests
from config import AUTH_TOKEN, API_URL
from transformers import tournament

headers = {"authorization": AUTH_TOKEN}


def get_draws(tournament_id: int):
    url = f"{API_URL}/vue-tournament-draws"
    payload = {"tmtId": tournament_id, "tmtTab": "draw"}

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return response.json()


def get_events(tournament_id: int):
    url = f"{API_URL}/vue-tournament-events"
    payload = {
        "drawCount": 0,
        "eventName": "1",
        "isPara": False,
        "searchKey": "",
        "tmtId": tournament_id,
        "tmtTab": "podium",
        "tmtType": 0,
    }

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return tournament.transform_events(response.json())


def get_bracket(tournament_id: int, draw_id: str):
    url = f"{API_URL}/vue-tournament-draw-data"
    payload = {"drawId": draw_id, "tmtId": tournament_id, "tmtTab": "draw"}

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return response.json()


def get_courts(tournament_code: str, date: str):
    url = f"{API_URL}/tournaments/day-matches/courts?tournamentCode={tournament_code}&date={date}"
    response = requests.get(url, headers=headers, impersonate="chrome")

    if response.status_code == 404:
        return None

    return response.json()


def get_matches(tournament_code: str, date: str):
    url = f"{API_URL}/tournaments/day-matches?tournamentCode={tournament_code}&date={date}"
    response = requests.get(url, headers=headers, impersonate="chrome")
    return response.json()


def get_event_stages(tournament_id: int, event_id: str):
    url = f"{API_URL}/vue-tournament-event-stages"
    payload = {"tmtId": tournament_id, "eventName": event_id}

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return tournament.transform_event_stages(response.json())


def get_players_staged(tournament_id: int, event_id: str):
    url = f"{API_URL}/vue-tournament-players-staged"
    payload = {
        "drawCount": 0,
        "eventName": event_id,
        "isPara": False,
        "searchKey": "",
        "tmtId": tournament_id,
        "tmtTab": "2025-01-12",
        "tmtType": 0,
    }

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return tournament.transform_players_staged(response.json())
