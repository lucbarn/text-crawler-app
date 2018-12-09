new_lines = []

with open('templates/index.html', 'r') as in_file:
    lines = in_file.readlines()
    for line in lines:
        css_index = line.find('.css')
        if css_index > -1:
            i = 1
            while line[css_index - i] != '=':
                i += 1
            line = line[:(css_index - i + 2)] + '../static/' + line[(css_index - i + 2):]
        js_index = line.find('.js')
        while js_index > -1:
            i = 1
            while line[js_index - i] != '=':
                i += 1
            line = line[:(js_index - i + 2)] + '../static/' + line[(js_index - i + 2):]
            js_index = line.find('.js', js_index + 11)
        new_lines.append(line)

with open('templates/index.html', 'w') as out_file:
    out_file.write(''.join(new_lines))
