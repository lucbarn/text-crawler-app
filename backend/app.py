from flask import Flask, render_template, jsonify, request
import json
from utils import *

app = Flask(__name__)

currentCrawler = {
    'crawler': None,
    'next_res': None,
    'current_ebook': None,
    'completed': True
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ebooks')
def get_ebooks():
    filenames = get_ebooks_names()
    return jsonify({'ebooks_names': filenames})

@app.route('/phrases', methods=['POST'])
def get_phrases():
    content = request.get_json()
    words = content['wordsList']
    new_analysis = content['newAnalysis'] == 1
    if new_analysis:
        first_res = []
        currentCrawler['crawler'] = crawler_generator(words)
        currentCrawler['next_res'] = None
        currentCrawler['current_ebook'] = None
        currentCrawler['completed'] = False
        for i in range(20):
            try:
                phrase = next(currentCrawler['crawler'])
                first_res.append(phrase)
            except:
                break
        currentCrawler['next_res'] = first_res
    res = currentCrawler['next_res'][:]
    next_res = []
    for i in range(20):
        try:
            phrase = next(currentCrawler['crawler'])
            next_res.append(phrase)
        except:
            break
    currentCrawler['next_res'] = next_res
    if len(next_res) == 0:
        currentCrawler['completed'] = True
    else:
        currentCrawler['completed'] = False
    formatted_res = []
    for ebook, phrase, phrase_index in res:
        if ebook != currentCrawler['current_ebook']:
            formatted_res.append(['<strong>' + ebook + '<strong>', phrase_index - 1])
            currentCrawler['current_ebook'] = ebook
        formatted_res.append([phrase, phrase_index])
    print(formatted_res)
    return jsonify({'phrases': formatted_res, 'completed': currentCrawler['completed']})

if __name__ == '__main__':
    app.run()
