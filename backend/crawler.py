from utils import *

class Crawler:
    def __init__(self):
        self.crawler_generator = None
        self.next_res = None
        self.current_ebook = None
        self.completed = False

    def set_generator(self, words_list):
        self.crawler_generator = crawler_generator(words_list)

    def set_next_res(self, next_res):
        self.next_res = next_res

    def get_next_res(self):
        return self.next_res

    def set_current_ebook(self, ebook):
        self.current_ebook = ebook

    def get_current_ebook(self):
        return self.current_ebook

    def set_completed(self):
        self.completed = True

    def get_completed(self):
        return self.completed

    def get_next(self):
        try:
            res = next(self.crawler_generator)
        except:
            res = None
        return res

    def reset(self):
        self.crawler_generator = None
        self.next_res = None
        self.current_ebook = None
        self.completed = False
