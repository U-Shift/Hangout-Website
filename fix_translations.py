import json
import re

with open('translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON part
prefix = "const translations = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind(";")
json_str = content[start_idx:end_idx]

data = json.loads(json_str)

new_data = {}
for lang, trans in data.items():
    new_data[lang] = {}
    for key, value in trans.items():
        # Trim leading/trailing whitespace and normalize internal spaces
        new_key = re.sub(r'\s+', ' ', key.strip())
        new_value = re.sub(r'\s+', ' ', value.strip())
        new_data[lang][new_key] = new_value

# Write back
new_content = prefix + json.dumps(new_data, indent=2, ensure_ascii=False) + ";\n"

with open('translations.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("translations.js updated successfully via python!")
