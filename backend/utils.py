from os import walk

def get_ebooks_names():
    folder_structure = walk('./ebooks')
    *head, filenames = next(folder_structure)
    return filenames

def crawler_generator(words_list):
    ebooks_names = get_ebooks_names()
    words_set = set(words_list)
    for ebook_name in ebooks_names:
        ebook_title = ' '.join(map(lambda word: word.title(), ebook_name.strip('.txt').split('_')))
        with open('./ebooks/{ebook_name}'.format(ebook_name=ebook_name)) as in_file:
            text = in_file.read()
            text_words = text.split()
            line_words = []
            line_matches = []
            k = 0
            for i, word in enumerate(text_words):
                line_words.append(word)
                stripped_word = word.rstrip('.;?!')
                if stripped_word in words_set:
                    line_matches.append((i-k, stripped_word))
                if len(stripped_word) < len(word) or i == len(text_words) - 1:
                    for j, match in line_matches:
                        res = ''
                        res += '<strong>' + match.upper() + '</strong>: '
                        res += ' '.join(line_words[:j])
                        res += ' <strong>' + line_words[j] + '</strong> '
                        res += ' '.join(line_words[j+1:])
                        yield (ebook_title, res.strip())
                    line_words = []
                    line_matches = []
                    k = i+1
