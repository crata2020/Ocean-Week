path = r'c:\Users\wnsdu\Desktop\해양주간\src\app\[slug]\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 기관장 토크 콘서트 - add subtitle
content = content.replace(
    '기관장 토크 콘서트\n'
    '                              <ExternalLink className="h-3 w-3 text-sky-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">11:00~12:00</div>',
    '기관장 토크 콘서트\n'
    '                              <ExternalLink className="h-3 w-3 text-sky-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">해양수산부 이전과 해양수도 부산</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">11:00~12:00</div>'
)

# 2. Day 2 morning: 개회식/공연 -> 세션 오프닝행사
content = content.replace(
    '개회식/공연</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:00~10:20</div>',
    '세션 오프닝행사</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:00~10:20</div>'
)

# 3. Day 2 morning blue-carbon: update ID and content
content = content.replace(
    'setSelectedSessionId("blue-carbon")\n'
    '                          >\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-blue-300">\n'
    '                              해양경제포럼\n'
    '                              <ExternalLink className="h-3 w-3 text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">\n'
    '                              <span className="text-[11px] font-bold text-blue-600">①</span> 블루카본마켓\n'
    '                            </div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:20~12:00</div>',
    'setSelectedSessionId("blue-carbon-am")\n'
    '                          >\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-blue-300">\n'
    '                              해양경제포럼\n'
    '                              <ExternalLink className="h-3 w-3 text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">\n'
    '                              <span className="text-[11px] font-bold text-blue-600">①</span> 블루카본의 잠재력과 탄소시장화 전략\n'
    '                            </div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:20~12:00</div>'
)

# 4. Day 1 afternoon: arctic-route -> arctic-route-presentation
content = content.replace(
    'setSelectedSessionId("arctic-route")',
    'setSelectedSessionId("arctic-route-presentation")'
)

# 5. Day 2 afternoon: blue-carbon -> blue-carbon-pm, update content, add offshore-wind
old_pm = (
    'setSelectedSessionId("blue-carbon")\n'
    '                          >\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-blue-300">\n'
    '                              해양경제포럼\n'
    '                              <ExternalLink className="h-3 w-3 text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">\n'
    '                              <span className="text-[11px] font-bold text-blue-600">②</span> 패널 (블루카본)\n'
    '                            </div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">13:30~15:00</div>\n'
    '                          </div>\n'
    '                          <div \n'
    '                            className="group/item cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/10 -m-2 p-2 rounded-lg transition-colors"\n'
    '                            onClick={() => setSelectedSessionId("polar-lecture")}\n'
    '                          >\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-amber-300">\n'
    '                              극지시민강좌 (폴라 문화)\n'
    '                              <ExternalLink className="h-3 w-3 text-amber-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">16:00~18:00</div>\n'
    '                          </div>'
)
new_pm = (
    'setSelectedSessionId("blue-carbon-pm")\n'
    '                          >\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-blue-300">\n'
    '                              해양경제포럼\n'
    '                              <ExternalLink className="h-3 w-3 text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">\n'
    '                              <span className="text-[11px] font-bold text-blue-600">②</span> 블루카본 탄소시장 반영방안\n'
    '                            </div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">13:30~15:00</div>\n'
    '                          </div>\n'
    '                          <div>\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200">해양경제포럼</div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5"><span className="text-[11px] font-bold text-blue-600">③</span> 해상풍력 특별법 시대 개막</div>\n'
    '                            <div className="text-[13px] text-slate-500 dark:text-slate-400">기회와 도전, 미래전략</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">15:30~17:00</div>\n'
    '                          </div>'
)
if old_pm in content:
    content = content.replace(old_pm, new_pm)
    print("PM replacement OK")
else:
    print("PM NOT FOUND")

# 6. Day 3 morning: 시상식 title update
content = content.replace(
    '대한민국해양지도자 대상\n'
    '                              <ExternalLink className="h-3 w-3 text-teal-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:00~11:00</div>',
    '제2회 대한민국해양지도자 대상<br />시상식\n'
    '                              <ExternalLink className="h-3 w-3 text-teal-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:00~11:00</div>'
)

# 7. Day 3 morning: 해양산업리더스 서밋 - add special lecture info
content = content.replace(
    '해양산업리더스 서밋</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">11:00~12:00</div>',
    '해양산업리더스 서밋</div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">송상근 부산항만공사 사장 특강</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">11:00~12:00</div>'
)

# 8. Day 3 afternoon: update online conference and polar-lecture ordering and IDs
old_day3_pm = (
    '<div>\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200">온라인 컨퍼런스</div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5"><span className="text-[11px]">①</span>북극항로 연관산업 발전방안</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-1.5 mt-0.5">14:00~15:30</div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5"><span className="text-[11px]">②</span>북극항로시대 극지교육의 방향성</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">16:00~17:30</div>\n'
    '                          </div>\n'
    '                          <div>\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200">청소년 프레젠테이션대회</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">14:00~17:00</div>\n'
    '                          </div>'
)
new_day3_pm = (
    '<div>\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200">온라인 컨퍼런스</div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5"><span className="text-[11px]">①</span>북극항로 연관산업 발전 방안</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-1.5 mt-0.5">14:00~15:30</div>\n'
    '                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5"><span className="text-[11px]">②</span>북극항로시대 극지교육의 방향성</div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">16:00~17:30</div>\n'
    '                          </div>\n'
    '                          <div \n'
    '                            className="group/item cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/10 -m-2 p-2 rounded-lg transition-colors"\n'
    '                            onClick={() => setSelectedSessionId("polar-lecture")}\n'
    '                          >\n'
    '                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-amber-300">\n'
    '                              극지시민강좌\n'
    '                              <ExternalLink className="h-3 w-3 text-amber-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />\n'
    '                            </div>\n'
    '                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">14:00~17:00</div>\n'
    '                          </div>'
)
if old_day3_pm in content:
    content = content.replace(old_day3_pm, new_day3_pm)
    print("Day3 afternoon OK")
else:
    print("Day3 afternoon NOT FOUND - checking current Day3 afternoon...")
    idx = content.find('온라인 컨퍼런스')
    if idx >= 0:
        print(repr(content[idx-50:idx+400]))

# 9. Update the detail timeline modal references
content = content.replace('"arctic-route"', '"arctic-route-presentation"')
content = content.replace('"blue-carbon"', '"blue-carbon-am"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
