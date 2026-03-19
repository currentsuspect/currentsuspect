import sqlite3

DB='/home/currentsuspect/blueprint/blueprint.db'
conn=sqlite3.connect(DB)
cur=conn.cursor()

targets=['philosophy-wisdom','psychology-neuroscience']
block='''## Vocabulary links
- [[Epistemology]]
- [[Ethics]]
- [[Logic]]
- [[Argument]]
- [[Cognitive Bias]]
- [[Self-Regulation]]
- [[Manipulation]]
- [[Evidence-Based Thinking]]

'''

cur.execute('''
select l.id,l.content from lessons l
join modules m on l.module_id=m.id
join academies a on a.id=m.academy_id
where a.slug in (?,?)
''', (targets[0],targets[1]))
rows=cur.fetchall()
updated=0
for lid,content in rows:
    c=content or ''
    if '## Vocabulary links' in c:
        continue
    if c.startswith('#'):
        parts=c.split('\n',2)
        if len(parts)>=3:
            new=parts[0]+'\n\n'+block+parts[1]+'\n'+parts[2]
        else:
            new=c+'\n\n'+block
    else:
        new=block+c
    cur.execute('update lessons set content=? where id=?',(new,lid))
    updated+=1

conn.commit()
print('updated_lessons',updated)
