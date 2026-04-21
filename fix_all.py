import os

# 1. Update location to VietNam
with open('src/hooks/use-emilia-config.tsx', 'r') as f:
    config = f.read()
config = config.replace("'Germany'", "'VietNam'")
with open('src/hooks/use-emilia-config.tsx', 'w') as f:
    f.write(config)

# 2. Revert variable names and support multiple extensions for avatar
# First, let's find all avatar imports and change them to a generic glob or try/catch?
# Actually, Vite doesn't support glob imports for single files easily in this way.
# But I can use the same import name and just point to avatar.svg for now, or use a more flexible way.
# The user wants to keep variable 'avatarUrl'.

header_project_path = 'src/components/header-project.tsx'
with open(header_project_path, 'r') as f:
    hp = f.read()
hp = hp.replace("import viteLogo from '../content/assets/vite.svg'", "import avatarUrl from '../content/assets/avatar.svg'")
hp = hp.replace("{viteLogo && (", "{avatarUrl && (")
hp = hp.replace("src={viteLogo}", "src={avatarUrl}")
hp = hp.replace('alt="Vite Logo"', 'alt="Avatar"')
with open(header_project_path, 'w') as f:
    f.write(hp)

header_path = 'src/components/header.tsx'
with open(header_path, 'r') as f:
    h = f.read()
h = h.replace("import viteLogo from '../content/assets/vite.svg'", "import avatarUrl from '../content/assets/avatar.svg'")
h = h.replace("{viteLogo ? (", "{avatarUrl ? (")
h = h.replace("src={viteLogo}", "src={avatarUrl}")
h = h.replace('alt="Vite Logo"', 'alt="Avatar"')
with open(header_path, 'w') as f:
    f.write(h)

# 3. Rewrite project fallback
projects_path = 'src/components/projects.tsx'
fallback_text = """
const Projects = ({ projects }: Props) => {
  if (projects.length === 0) {
    return (
      <Layout>
        <Header />
        <div className="container py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">No projects found</h2>
          <p className="text-text-muted">
            It looks like you haven't added any projects yet.
            Check the README for instructions on how to get started!
          </p>
        </div>
      </Layout>
    )
  }
"""

with open(projects_path, 'r') as f:
    p_lines = f.readlines()

new_p_lines = []
skip = False
for line in p_lines:
    if 'const Projects = ({ projects }: Props) => {' in line:
        new_p_lines.append(fallback_text)
        skip = True
    elif 'return (' in line and skip:
        # We are looking for the end of the if block
        pass
    elif '  return (' in line and skip:
        skip = False
        new_p_lines.append(line)
    elif not skip:
        new_p_lines.append(line)

with open(projects_path, 'w') as f:
    f.writelines(new_p_lines)
