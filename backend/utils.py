from os import walk

def format_title(s):
    res = ' '.join(map(lambda word: word.title(), s.strip('.txt').split('_')))
    return res

def get_ebooks_names():
    folder_structure = walk('./ebooks')
    *head, filenames = next(folder_structure)
    ebooks_names = [filename for filename in filenames if filename.rsplit('.',1)[1:] == ['txt']]
    return ebooks_names

def crawler_generator(target_word):
    ebooks_names = get_ebooks_names()
    phrase_index = 0
    for ebook_name in ebooks_names:
        # every ebook title gets assigned an index, so phrase_index is incremented by 1
        phrase_index += 1
        ebook_title = format_title(ebook_name)
        with open('./ebooks/{ebook_name}'.format(ebook_name=ebook_name)) as in_file:
            text = in_file.read()
            text_words = text.split()
            line_words = []
            line_matches = []
            k = 0
            for i, word in enumerate(text_words):
                line_words.append(word)
                stripped_word = word.rstrip('.;?!')
                if stripped_word == target_word:
                    line_matches.append((i-k, stripped_word))
                # check whether the current word is the last of the line
                if len(stripped_word) < len(word) or i == len(text_words) - 1:
                    for j, match in line_matches:
                        res = ''
                        res += '<strong>' + match.upper() + '</strong>: '
                        res += ' '.join(line_words[:j])
                        res += ' <strong>' + line_words[j] + '</strong> '
                        res += ' '.join(line_words[j+1:])
                        yield (match, ebook_title, res.strip(), phrase_index)
                        phrase_index += 1
                    line_words = []
                    line_matches = []
                    k = i+1
