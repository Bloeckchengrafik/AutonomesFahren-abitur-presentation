from transformers import pipeline


def main():
    sentiment_pipeline = pipeline(
        "sentiment-analysis",
        model="oliverguhr/german-sentiment-bert",
        top_k=1
    )
    data = ["Butterbrot"]
    results = sentiment_pipeline(data)
    print(results)


if __name__ == "__main__":
    main()
