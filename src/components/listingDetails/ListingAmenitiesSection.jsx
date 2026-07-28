import { MONTH_NAME } from "@/data";
import { formatDate } from "@/services";

function ListingAmenitiesSection({
  listing,
  onShowAmenitiesModal,
  currentMonth,
  setCurrentMonth,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  nights,
}) {
  const getMonthName = (dateMonth) => {
    const month = MONTH_NAME;
    return month[dateMonth.getMonth()];
  };

  const goToPrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };
  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const getFirstDayInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateBooked = (year, month, day) => {
    if (!listing?.bookedDates?.dates) return false;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return listing.bookedDates.dates.includes(dateStr);
  };

  const isDatePast = (year, month, day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const clickDate = new Date(year, month, day);
    return clickDate < today;
  };

  const isDateSelected = (year, month, day) => {
    if (!checkIn || !checkOut) return false;
    const [dayIn, monthIn, yearIn] = checkIn.split("/");
    const [dayOut, monthOut, yearOut] = checkOut.split("/");
    const checkInDate = new Date(
      parseInt(yearIn),
      parseInt(monthIn) - 1,
      parseInt(dayIn),
    );
    const checkOutDate = new Date(
      parseInt(yearOut),
      parseInt(monthOut) - 1,
      parseInt(dayOut),
    );
    const currentDate = new Date(year, month, day);

    return currentDate >= checkInDate && currentDate <= checkOutDate;
  };

  const handleDateClick = (year, month, day) => {
    const clickedDate = new Date(year, month, day);
    const dateStr = `${day}/${month + 1}/${year}`;

    if (isDateBooked(year, month, day) || isDatePast(year, month, day)) {
      return null;
    }

    if (!checkIn || checkOut) {
      setCheckIn(dateStr);
      setCheckOut(null);
      return;
    }

    const [d, m, y] = checkIn.split("/");
    const checkInDate = new Date(y, m - 1, d);

    if (clickedDate < checkInDate) {
      setCheckIn(dateStr);
      setCheckOut(null);
    } else {
      setCheckOut(dateStr);
    }
  };

  const renderCalenderMonth = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    //!Days Month
    const daysMonth = getDaysInMonth(monthDate);
    //!FirstDay Month
    const firstDay = getFirstDayInMonth(monthDate);

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysMonth; day++) {
      days.push(day);
    }
    return (
      <>
        <div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={index}
                className="text-xs font-semibold text-gray-600 text-center py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index}></div>;
              }
              const isBook = isDateBooked(year, month, day);
              const isPast = isDatePast(year, month, day);
              const isSelected = isDateSelected(year, month, day);

              let isCheckIn = false;
              let isCheckOut = false;

              if (checkIn) {
                const [checkDay, checkMonth, checkYear] = checkIn.split("/");
                if (
                  parseInt(checkYear) === year &&
                  parseInt(checkMonth) - 1 === month &&
                  parseInt(checkDay) === day
                ) {
                  isCheckIn = true;
                }
              }
              if (checkOut) {
                const [checkDay, checkMonth, checkYear] = checkOut.split("/");
                if (
                  parseInt(checkYear) === year &&
                  parseInt(checkMonth) - 1 === month &&
                  parseInt(checkDay) === day
                ) {
                  isCheckOut = true;
                }
              }
              return (
                <button
                  onClick={() => handleDateClick(year, month, day)}
                  className={`text-sm text-center py-2 rounded-full
                    ${
                      isBook
                        ? "bg-red-100 text-red-600 cursor-not-allowed font-semibold"
                        : isCheckIn || isCheckOut
                          ? "bg-gray-900 text-white font-semibold"
                          : isSelected
                            ? "bg-gray-200 text-gray-900"
                            : isPast
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 cursor-pointer hover:bg-gray-100"
                    }
                   `}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div id="amenities" className="mb-16 scroll-mt-24">
        <div className="mb-12">
          {nights > 0 ? (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {nights} nights in {listing.location}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {formatDate(checkIn)} - {formatDate(checkOut)}
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select dates
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Add your travel dates for exact pricing
              </p>
            </>
          )}

          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goToPrevMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Previous month">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-8">
                <div className="text-base font-semibold text-gray-900">
                  {getMonthName(currentMonth)} {currentMonth.getFullYear()}
                </div>
                <div className="text-base font-semibold text-gray-900">
                  {getMonthName(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                      1,
                    ),
                  )}{" "}
                  {new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1,
                    1,
                  ).getFullYear()}
                </div>
              </div>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Next month">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {/* <!-- Current Month --> */}

              {renderCalenderMonth(currentMonth)}

              {/* <!-- NextMonth --> */}
              {renderCalenderMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1,
                ),
              )}
            </div>
            {(checkIn || checkOut) && (
              <button
                onClick={() => {
                  setCheckIn("");
                  setCheckOut("");
                }}
                className="mt-4 text-sm font-semibold text-gray-900 underline hover:text-gray-700">
                Clear dates
              </button>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            What this place offers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {listing.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-900">{amenity}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onShowAmenitiesModal}
            className="text-sm font-semibold text-gray-900 underline hover:text-gray-700">
            Show all {listing.allAmenities.length} amenities
          </button>
        </div>
      </div>
    </>
  );
}

export default ListingAmenitiesSection;
