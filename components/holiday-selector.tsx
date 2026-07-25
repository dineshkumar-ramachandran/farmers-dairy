"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CalendarX, Plus } from "lucide-react"
import { format, isWithinInterval } from "date-fns"
import type { DateRange } from "react-day-picker"

interface HolidaySelectorProps {
  dateRange: DateRange | undefined
  deliveryDate: Date | undefined
  subscription: string
  holidays: Date[]
  onHolidaysChange: (holidays: Date[]) => void
}

export function HolidaySelector({
  dateRange,
  deliveryDate,
  subscription,
  holidays,
  onHolidaysChange,
}: HolidaySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedHolidays, setSelectedHolidays] = useState<Date[]>([]) // 🔄 Changed to array for multiple selection

  const getDateRange = () => {
    if (subscription === "custom" && dateRange?.from && dateRange?.to) {
      return { from: dateRange.from, to: dateRange.to }
    }

    if (deliveryDate) {
      const from = deliveryDate
      const to = new Date(deliveryDate)

      if (subscription === "weekly") {
        to.setDate(to.getDate() + 6)
      } else if (subscription === "monthly") {
        to.setDate(to.getDate() + 29)
      }

      return { from, to }
    }

    return null
  }

  const range = getDateRange()

  // 🔄 Updated to handle multiple dates
  // 🔄 Updated to add multiple holidays
  const addHolidays = () => {
    if (selectedHolidays.length > 0) {
      const newHolidays = selectedHolidays.filter(
        (selectedDate) => !holidays.some((existingDate) => existingDate.getTime() === selectedDate.getTime()),
      )
      onHolidaysChange([...holidays, ...newHolidays])
      setSelectedHolidays([])
      setIsOpen(false)
    }
  }

  const removeHoliday = (holidayToRemove: Date) => {
    onHolidaysChange(holidays.filter((h) => h.getTime() !== holidayToRemove.getTime()))
  }

  const isDateInRange = (date: Date) => {
    if (!range) return false
    return isWithinInterval(date, { start: range.from, end: range.to })
  }

  // 🔄 Check if date is selected for highlighting
  const isDateSelected = (date: Date) => {
    return selectedHolidays.some((d) => d.getTime() === date.getTime())
  }

  if (!range) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-earth-700">Holidays (Optional)</label>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Add Holiday
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CalendarX className="w-5 h-5 mr-2 text-btngreen" />
                Select Holidays
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-earth-600">
                Select multiple dates when you don't want milk delivery. These days will be added to the end of your
                subscription.
              </p>

              {/* 🔄 Show selected dates count */}
              {selectedHolidays.length > 0 && (
                <div className="p-2 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">{selectedHolidays.length} date(s) selected</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedHolidays.map((date, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        {format(date, "MMM dd")}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Calendar
                mode="multiple"
                selected={selectedHolidays}
                onSelect={(dates) => setSelectedHolidays(dates || [])}
                disabled={(date) => !isDateInRange(date) || holidays.some((h) => h.getTime() === date.getTime())}
                className="rounded-md border"
                classNames={{
                  selected: "bg-blue-500 text-white rounded-md hover:bg-blue-600",
                }}
              />

              <div className="flex space-x-2">
                <Button onClick={addHolidays} disabled={selectedHolidays.length === 0} className="btn-primary flex-1">
                  Add {selectedHolidays.length > 0 ? `${selectedHolidays.length} ` : ""}Holiday
                  {selectedHolidays.length !== 1 ? "s" : ""}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedHolidays([])
                    setIsOpen(false)
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {holidays.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-sage-600">Selected Holidays:</p>
          <div className="flex flex-wrap gap-2">
            {holidays.map((holiday, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer animate-scale-in"
                onClick={() => removeHoliday(holiday)}
              >
                {format(holiday, "MMM dd")} ×
              </Badge>
            ))}
          </div>
          <p className="text-xs text-sage-600">
            Click on a holiday to remove it. Your subscription will be extended by {holidays.length} day(s).
          </p>
        </div>
      )}
    </div>
  )
}
