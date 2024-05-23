install:
    python3 -m venv venv
    ./venv/bin/python3 -m pip install -r requirements.txt

sentiment:
    ./venv/bin/python3 -m sentiment-analysis
