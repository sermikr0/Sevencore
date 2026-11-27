"""Excel export of the period report (summary sheet + day-by-day sheet)."""
from __future__ import annotations

import io
from datetime import date, datetime

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

ORANGE, BLACK, WHITE, GREY = "FF5A00", "111111", "FFFFFF", "F3F1EE"
FILLS = {"present": "FFFFFF", "late": "FFE3CC", "absent": "1F1F1F", "off": "EFEDEA", "sick": "EFEDEA",
         "vacation": "EFEDEA", "pending": "FFF6EF", "planned": "FFFFFF", "none": "FAFAFA"}

L = {
    "uz": {"title": "Davomat hisoboti", "period": "Davr", "made": "Tayyorlandi", "summary": "Xulosa", "daily": "Kunlik",
           "cols": ["Xodim", "Bo'lim", "Smena guruhi", "Smena", "Ish kunlari", "Vaqtida", "Kechikdi", "Kelmadi", "Dam olish",
                    "Kasal / ta'til", "Ishlagan soat", "O'rtacha kelish", "Kechikish, daq", "Davomat %", "Auto check-out"],
           "total": "Jami", "employee": "Xodim", "hours": "Soat",
           "codes": {"absent": "Kelmadi", "off": "Dam", "sick": "Kasal", "vacation": "Ta'til", "pending": "Kutilmoqda",
                     "planned": "", "none": ""}},
    "ru": {"title": "Отчёт по посещаемости", "period": "Период", "made": "Сформирован", "summary": "Сводка", "daily": "По дням",
           "cols": ["Сотрудник", "Отдел", "Группа смены", "Смена", "Рабочих дней", "Вовремя", "Опоздал", "Не пришёл", "Выходные",
                    "Больничный / отпуск", "Часы", "Средний приход", "Опоздание, мин", "Посещаемость %", "Авто-уход"],
           "total": "Итого", "employee": "Сотрудник", "hours": "Часы",
           "codes": {"absent": "Нет", "off": "Вых", "sick": "Бол", "vacation": "Отп", "pending": "Ожид", "planned": "", "none": ""}},
    "en": {"title": "Attendance report", "period": "Period", "made": "Generated", "summary": "Summary", "daily": "Daily",
           "cols": ["Employee", "Department", "Shift group", "Shift", "Work days", "On time", "Late", "Absent", "Days off",
                    "Sick / vacation", "Hours", "Avg arrival", "Late, min", "Attendance %", "Auto check-out"],
           "total": "Total", "employee": "Employee", "hours": "Hours",
           "codes": {"absent": "Absent", "off": "Off", "sick": "Sick", "vacation": "Leave", "pending": "Pending",
                     "planned": "", "none": ""}},
}


def _hours(minutes: int) -> float:
    return round(minutes / 60, 2)


def build(report: dict, start: date, end: date, now: datetime, lang: str = "uz") -> bytes:
    t = L.get(lang, L["uz"])
    thin = Side(style="thin", color="DDDAD5")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    head_font = Font(name="Calibri", bold=True, color=WHITE, size=10)
    head_fill = PatternFill("solid", fgColor=BLACK)
    wb = Workbook()

    # ---- summary
    ws = wb.active
    ws.title = t["summary"]
    ws["A1"] = f"SEVENCORE · {t['title']}"
    ws["A1"].font = Font(name="Calibri", bold=True, size=15, color=BLACK)
    ws["A2"] = f"{t['period']}: {start.isoformat()} — {end.isoformat()}    {t['made']}: {now.strftime('%Y-%m-%d %H:%M')}"
    ws["A2"].font = Font(name="Calibri", size=10, color="6B6864")
    ws.row_dimensions[1].height = 24
    bar = PatternFill("solid", fgColor=ORANGE)
    for c in range(1, len(t["cols"]) + 1):
        ws.cell(row=3, column=c).fill = bar
    ws.row_dimensions[3].height = 4
    for c, name in enumerate(t["cols"], 1):
        cell = ws.cell(row=4, column=c, value=name)
        cell.font, cell.fill, cell.border = head_font, head_fill, border
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    ws.row_dimensions[4].height = 30
    r = 5
    order = {g: i for i, g in enumerate(report.get("groups") or [])}
    rows = sorted(report["rows"], key=lambda x: order.get(x.get("group"), len(order)))     # stable: by group, then name
    for row in rows:
        tt = row["totals"]
        vals = [row["name"], row["department"] or "", row.get("group") or "", row["shift"] or "", tt["work_days"], tt["on_time"], tt["late"],
                tt["absent"], tt["off"], tt["sick"] + tt["vacation"], _hours(tt["worked_min"]), tt["avg_in"] or "",
                tt["late_min"], tt["rate"] if tt["rate"] is not None else "", tt["auto_out"]]
        for c, v in enumerate(vals, 1):
            cell = ws.cell(row=r, column=c, value=v)
            cell.border = border
            cell.font = Font(name="Calibri", size=10, bold=c == 1)
            cell.alignment = Alignment(horizontal="left" if c <= 4 else "center", vertical="center")
        ws.cell(row=r, column=14).number_format = "0.0%"
        if tt["late"]:
            ws.cell(row=r, column=7).fill = PatternFill("solid", fgColor="FFE3CC")
        if tt["absent"]:
            ws.cell(row=r, column=8).font = Font(name="Calibri", size=10, bold=True, color="C2410C")
        r += 1
    tot = report["totals"]
    vals = [t["total"], "", "", "", tot["work_days"], tot["on_time"], tot["late"], tot["absent"], tot["off"],
            tot["sick"] + tot["vacation"], _hours(tot["worked_min"]), "", tot["late_min"],
            tot["rate"] if tot["rate"] is not None else "", tot["auto_out"]]
    for c, v in enumerate(vals, 1):
        cell = ws.cell(row=r, column=c, value=v)
        cell.font = Font(name="Calibri", size=10, bold=True, color=WHITE)
        cell.fill = PatternFill("solid", fgColor=ORANGE)
        cell.border = border
        cell.alignment = Alignment(horizontal="left" if c == 1 else "center")
    ws.cell(row=r, column=14).number_format = "0.0%"
    widths = [26, 12, 16, 14, 11, 9, 10, 10, 10, 13, 11, 13, 13, 13, 13]
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.freeze_panes = "B5"

    # ---- day by day
    wd = wb.create_sheet(t["daily"])
    days = report["days"]
    wd.cell(row=1, column=1, value=t["employee"]).font = head_font
    wd.cell(row=1, column=1).fill = head_fill
    for i, d in enumerate(days, 2):
        dd = date.fromisoformat(d)
        cell = wd.cell(row=1, column=i, value=dd.strftime("%d.%m"))
        cell.font, cell.fill = head_font, PatternFill("solid", fgColor=ORANGE if dd.weekday() >= 5 else BLACK)
        cell.alignment = Alignment(horizontal="center")
        wd.column_dimensions[get_column_letter(i)].width = 8.5
    hc = len(days) + 2
    wd.cell(row=1, column=hc, value=t["hours"]).font = head_font
    wd.cell(row=1, column=hc).fill = head_fill
    wd.column_dimensions["A"].width = 26
    for r, row in enumerate(rows, 2):
        wd.cell(row=r, column=1, value=row["name"]).font = Font(name="Calibri", size=10, bold=True)
        for i, day in enumerate(row["days"], 2):
            st = day["status"]
            text = day.get("first_in") or "" if st in ("present", "late") else t["codes"].get(st, "")
            if st == "late":
                text = f"{text} +{day.get('late_min', 0)}"
            cell = wd.cell(row=r, column=i, value=text)
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.border = border
            cell.fill = PatternFill("solid", fgColor=FILLS.get(st, WHITE))
            cell.font = Font(name="Calibri", size=9, color=WHITE if st == "absent" else ("C2410C" if st == "late" else BLACK),
                             bold=st in ("late", "absent"))
        cell = wd.cell(row=r, column=hc, value=_hours(row["totals"]["worked_min"]))
        cell.font = Font(name="Calibri", size=10, bold=True)
    wd.freeze_panes = "B2"
    buf = io.BytesIO()
    wb.save(buf)
    return buf.getvalue()
