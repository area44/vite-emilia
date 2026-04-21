import os

with open('src/components/header-project.tsx', 'r') as f:
    lines = f.readlines()

with open('src/components/header-project.tsx', 'w') as f:
    for line in lines:
        if '{viteLogo {avatarUrl && ({avatarUrl && ( (' in line:
            f.write('              {viteLogo && (\n')
        else:
            f.write(line)

with open('src/components/header.tsx', 'r') as f:
    content = f.read()

# Header seems okay based on read_file, but let me double check it.
