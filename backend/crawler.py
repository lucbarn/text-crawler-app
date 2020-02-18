from utils import *

class Crawler:
    def __init__(self):
        self.crawler_generator = None
        self.next_res = None
        self.current_ebook = None
        self.completed = False

    def get_next_res(self):
        res = self.next_res
        self.next_res = self.get_phrases(20)
        return res

    def set_current_ebook(self, ebook):
        self.current_ebook = ebook

    def get_current_ebook(self):
        return self.current_ebook

    def get_completed(self):
        return self.completed

    def get_phrases(self, n):
        res = []
        for i in range(n):
            try:
                phrase = next(self.crawler_generator)
                res.append(phrase)
            except:
                break
        if len(res) == 0:
            self.completed = True
        return res

    def set_generator(self, word):
        self.crawler_generator = crawler_generator(word)
        self.next_res = self.get_phrases(20)

    def reset(self):
        self.crawler_generator = None
        self.next_res = None
        self.current_ebook = None
        self.completed = False
