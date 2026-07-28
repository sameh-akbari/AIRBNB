import { GUEST_ROWS } from "@/data/search";
import { useDestinations } from "@/hooks";
import { formatWhoLabel, getDestinationsList } from "@/services/home.service";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function startOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isPastDate(year, month, day) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

function formatWhenLabel(checkIn, checkOut) {
  if (checkIn && checkOut) return `${checkIn} – ${checkOut}`;
  if (checkIn) return `${checkIn} – Select end`;
  return "Add dates";
}

function CalendarMonth({
  monthDate,
  isFirstMonth,
  checkIn,
  checkOut,
  onDateClick,
  onPrevMonth,
  onNextMonth,
}) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(day);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        {isFirstMonth ? (
          <button
            type="button"
            onClick={onPrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        ) : (
          <div className="w-9" />
        )}
        <h3 className="text-base font-semibold text-gray-900">
          {MONTH_NAMES[monthDate.getMonth()]} {year}
        </h3>
        {!isFirstMonth ? (
          <button
            type="button"
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ) : (
          <div className="w-9" />
        )}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (day === null) return <div key={`e-${index}`} />;
          const dateStr = toDateStr(year, month, day);
          const isPast = isPastDate(year, month, day);
          const isCheckIn = dateStr === checkIn;
          const isCheckOut = dateStr === checkOut;
          const isInRange =
            checkIn &&
            checkOut &&
            dateStr >= checkIn &&
            dateStr <= checkOut &&
            !isCheckIn &&
            !isCheckOut;

          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              onClick={() => onDateClick(year, month, day)}
              className={`text-sm py-2 rounded-lg ${
                isPast
                  ? "text-gray-300 cursor-not-allowed"
                  : isCheckIn || isCheckOut
                    ? "bg-gray-900 text-white font-semibold"
                    : isInRange
                      ? "bg-gray-200 text-gray-900 font-medium"
                      : "text-gray-900 hover:bg-gray-100"
              }`}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildSearchQuery(selectedWhere, checkIn, checkOut, guests) {
  const params = new URLSearchParams();
  if (selectedWhere?.city_id != null)
    params.set("city_id", selectedWhere.city_id);
  if (selectedWhere?.country_id != null)
    params.set("country_id", selectedWhere.country_id);
  if (checkIn) params.set("check_in", checkIn);
  if (checkOut) params.set("check_out", checkOut);
  if (guests.adults > 0) params.set("adults", String(guests.adults));
  if (guests.children > 0) params.set("children", String(guests.children));
  if (guests.infants > 0) params.set("infants", String(guests.infants));
  if (guests.pets > 0) params.set("pets", String(guests.pets));
  params.set("page", "1");
  params.set("per_page", "10");
  if (selectedWhere?.label) params.set("location", selectedWhere.label);
  return params;
}

function Search() {
  const [openModal, setOpenModal] = useState(null);
  const isWhereOpen = openModal === "where";
  const isWhenOpen = openModal === "when";
  const isWhoOpen = openModal === "who";
  const [selectedWhere, setSelectedWhere] = useState("");
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [calendarMonth, setCalendarMonth] = useState(startOfMonth);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const searchSectionRef = useRef(null);
  const whenDropdownRef = useRef(null);
  const searchQuery = buildSearchQuery(
    selectedWhere,
    checkIn,
    checkOut,
    guests,
  );
  const openOnly = (panel) => {
    setOpenModal((prev) => (prev === panel ? null : panel));
  };

  const updateGuest = (key, value) => {
    setGuests({ ...guests, [key]: value });
  };

  const handleDateClick = (year, month, day) => {
    const dateStr = toDateStr(year, month, day);
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut("");
    } else if (dateStr <= checkIn) {
      setCheckIn(dateStr);
      setCheckOut("");
    } else {
      setCheckOut(dateStr);
    }
  };

  const { data: destinationsResponse, isLoading: destinationsLoading } =
    useDestinations();

  const destinations = getDestinationsList(destinationsResponse);
  const nextMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    1,
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutsideSearch =
        searchSectionRef.current &&
        !searchSectionRef.current.contains(e.target);
      if (clickedOutsideSearch) setOpenModal(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, [openModal]);
  return (
    <>
      <div
        className="site-search-bar-section bg-gray-50 pb-8 pt-8 relative"
        ref={searchSectionRef}>
        <div className="flex justify-center px-6">
          <div className="flex items-center justify-between bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-shadow w-full max-w-[850px] relative">
            <div
              onClick={() => openOnly("where")}
              className="flex-1 px-6 py-4 text-left hover:bg-gray-50 rounded-full transition-colors">
              <div className="text-xs font-semibold text-gray-900">Where</div>
              <div className="text-sm text-gray-500 truncate">
                {selectedWhere.label || "Search destinations"}
              </div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div
              onClick={() => openOnly("when")}
              className="flex-1 px-6 py-4 text-left hover:bg-gray-50 rounded-full transition-colors">
              <div className="text-xs font-semibold text-gray-900">When</div>
              <div className="text-sm text-gray-500 truncate">
                {formatWhenLabel(checkIn, checkOut)}
              </div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div
              onClick={() => openOnly("who")}
              className="flex-1 px-6 py-4 text-left hover:bg-gray-50 rounded-full transition-colors">
              <div className="text-xs font-semibold text-gray-900">Who</div>
              <div className="text-sm text-gray-500 truncate">
                {formatWhoLabel(guests)}
              </div>
            </div>
            <Link
              to={`/s/homes?${searchQuery.toString()}`}
              className="m-2 p-3 bg-[#FF385C] text-white rounded-full hover:bg-[#E61E4D] transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* //!Modals */}
        {isWhereOpen && (
          <div id="search-where" className=" target:block">
            <div className="absolute top-[75%] left-1/2 -translate-x-1/2 mt-2 w-[calc(100%-3rem)] max-w-[850px] z-[1100] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Suggested destinations
                </h3>
                <div className="space-y-1 max-h-[320px] overflow-y-auto">
                  {destinationsLoading ? (
                    <div className="my-5 text-gray-500 font-semibold flex justify-center">
                      Destinations Is Loading .....
                    </div>
                  ) : destinations.length === 0 ? (
                    <div className="my-5 text-gray-500 font-semibold flex justify-center">
                      Destinations Is Not Found
                    </div>
                  ) : (
                    destinations.map((d) => (
                      <div
                        onClick={() => {
                          setSelectedWhere(d);
                          setOpenModal(null);
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <svg
                          className="w-5 h-5 text-gray-600 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 4v4m-5 4h9"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">
                            {d.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {d.properties_count} properties
                          </div>
                        </div>{" "}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {isWhenOpen && (
          <div id="search-when" className=" target:block">
            <div
              ref={whenDropdownRef}
              className="absolute top-[75%] left-1/2 -translate-x-1/2 mt-2 w-[calc(100%-3rem)] max-w-[850px] z-[1100] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  className="flex-1 px-6 py-4 text-sm font-semibold text-gray-900 border-b-2 border-gray-900 text-center">
                  Dates
                </button>
              </div>
              <div className="p-6">
                <div className="flex gap-8">
                  <CalendarMonth
                    monthDate={calendarMonth}
                    isFirstMonth
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onDateClick={handleDateClick}
                    onPrevMonth={() =>
                      setCalendarMonth(
                        new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() - 1,
                          1,
                        ),
                      )
                    }
                    onNextMonth={() =>
                      setCalendarMonth(
                        new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() + 1,
                          1,
                        ),
                      )
                    }
                  />
                  <CalendarMonth
                    monthDate={nextMonth}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onDateClick={handleDateClick}
                    onPrevMonth={() =>
                      setCalendarMonth(
                        new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() - 1,
                          1,
                        ),
                      )
                    }
                    onNextMonth={() =>
                      setCalendarMonth(
                        new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() + 1,
                          1,
                        ),
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {isWhoOpen && (
          <div id="search-who" className="target:block">
            <div className="absolute top-[75%] left-1/2 -translate-x-1/2 mt-2 w-[calc(100%-3rem)] max-w-[850px] z-[1100] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="p-6">
                {GUEST_ROWS.map(({ key, label, sub }, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <div className="text-base font-semibold text-gray-900">
                        {label}
                      </div>
                      {sub && (
                        <div className="text-sm text-gray-500">{sub}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        disabled={guests[key] === 0}
                        onClick={() =>
                          updateGuest(key, Math.max(0, guests[key] - 1))
                        }
                        className={`w-8 h-8 rounded-full border-2 ${
                          guests[key] === 0
                            ? "border-gray-300 text-gray-300 cursor-not-allowed"
                            : "border-gray-800 text-gray-800 cursor-pointer"
                        }  flex items-center justify-center text-lg leading-none`}>
                        −
                      </button>
                      <span className="text-base font-semibold text-gray-900 w-8 text-center">
                        {guests[key]}
                      </span>
                      <button
                        onClick={() => updateGuest(key, guests[key] + 1)}
                        className="w-8 h-8 rounded-full border-2 border-gray-900 text-gray-900 flex items-center justify-center text-lg leading-none">
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-900 underline">
                    Bringing a service animal?
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
