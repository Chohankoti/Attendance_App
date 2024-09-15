import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Define the type for each attendance item
type AttendanceItem = {
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  status: 'Present' | 'Absent';
};

// Define the type for the static data object
type StaticData = {
  [key: string]: AttendanceItem[];
};

const staticData: StaticData = {
    'July 2024': [
      { date: 'Monday 1 July 2024', checkIn: '09:00', checkOut: '16:00', totalHours: '07hr', status: 'Present' },
      { date: 'Tuesday 2 July 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
      { date: 'Wednesday 3 July 2024', checkIn: '08:30', checkOut: '15:30', totalHours: '07hr', status: 'Present' },
      { date: 'Thursday 4 July 2024', checkIn: '09:00', checkOut: '17:00', totalHours: '08hr', status: 'Present' },
      { date: 'Friday 5 July 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
      { date: 'Saturday 6 July 2024', checkIn: '09:15', checkOut: '16:15', totalHours: '07hr', status: 'Present' },
      { date: 'Sunday 7 July 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
      { date: 'Monday 8 July 2024', checkIn: '10:00', checkOut: '18:00', totalHours: '08hr', status: 'Present' },
      { date: 'Tuesday 9 July 2024', checkIn: '09:00', checkOut: '16:00', totalHours: '07hr', status: 'Present' },
      { date: 'Wednesday 10 July 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
    ],
    'August 2024': [
      { date: 'Thursday 1 August 2024', checkIn: '09:30', checkOut: '17:30', totalHours: '08hr', status: 'Present' },
      { date: 'Friday 2 August 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
      { date: 'Saturday 3 August 2024', checkIn: '08:45', checkOut: '16:45', totalHours: '08hr', status: 'Present' },
      { date: 'Sunday 4 August 2024', checkIn: '09:00', checkOut: '16:30', totalHours: '07.5hr', status: 'Present' },
      { date: 'Monday 5 August 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
      { date: 'Tuesday 6 August 2024', checkIn: '09:15', checkOut: '17:15', totalHours: '08hr', status: 'Present' },
      { date: 'Wednesday 7 August 2024', checkIn: '08:30', checkOut: '16:30', totalHours: '08hr', status: 'Present' },
      { date: 'Thursday 8 August 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
      { date: 'Friday 9 August 2024', checkIn: '09:00', checkOut: '16:00', totalHours: '07hr', status: 'Present' },
      { date: 'Saturday 10 August 2024', checkIn: '10:00', checkOut: '17:00', totalHours: '07hr', status: 'Present' },
    ],
    'September 2024': [
      { date: 'Sunday 1 September 2024', checkIn: '08:45', checkOut: '16:15', totalHours: '07.5hr', status: 'Present' },
      { date: 'Monday 2 September 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
      { date: 'Tuesday 3 September 2024', checkIn: '09:30', checkOut: '17:30', totalHours: '08hr', status: 'Present' },
      { date: 'Wednesday 4 September 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
      { date: 'Thursday 5 September 2024', checkIn: '09:15', checkOut: '17:15', totalHours: '08hr', status: 'Present' },
      { date: 'Friday 6 September 2024', checkIn: '08:30', checkOut: '16:30', totalHours: '08hr', status: 'Present' },
      { date: 'Saturday 7 September 2024', checkIn: '00:00', checkOut: '00:00', totalHours: '00hr', status: 'Absent' },
      { date: 'Sunday 8 September 2024', checkIn: '09:00', checkOut: '16:00', totalHours: '07hr', status: 'Present' },
      { date: 'Monday 9 September 2024', checkIn: '10:00', checkOut: '17:00', totalHours: '07hr', status: 'Present' },
      { date: 'Tuesday 10 September 2024', checkIn: '09:00', checkOut: '16:30', totalHours: '07.5hr', status: 'Present' },
    ],
  };
  

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Report = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(8); // Starting with 'July 2024'
  const [currentYear, setCurrentYear] = useState<number>(2024);

  const currentMonth = `${months[currentMonthIndex]} ${currentYear}`;

  // Get today's date (current month and year)
  const today = new Date();
  const currentMonthToday = today.getMonth(); // Months are 0-indexed in JavaScript
  const currentYearToday = today.getFullYear();

  // Check if data exists for the given month and year
  const dataExistsForMonth = (monthIndex: number, year: number) => {
    const monthKey = `${months[monthIndex]} ${year}`;
    return staticData.hasOwnProperty(monthKey);
  };

  // Go to previous month if data exists
  const handlePrevMonth = () => {
    let newMonthIndex = currentMonthIndex;
    let newYear = currentYear;

    if (currentMonthIndex === 0) {
      newMonthIndex = 11; // Move to December of the previous year
      newYear -= 1;
    } else {
      newMonthIndex -= 1;
    }

    if (dataExistsForMonth(newMonthIndex, newYear)) {
      setCurrentMonthIndex(newMonthIndex);
      setCurrentYear(newYear);
    }
  };

  // Go to next month if data exists
  const handleNextMonth = () => {
    let newMonthIndex = currentMonthIndex;
    let newYear = currentYear;

    if (currentMonthIndex === 11) {
      newMonthIndex = 0; // Move to January of the next year
      newYear += 1;
    } else {
      newMonthIndex += 1;
    }

    if (dataExistsForMonth(newMonthIndex, newYear)) {
      setCurrentMonthIndex(newMonthIndex);
      setCurrentYear(newYear);
    }
  };

  // Check if the next month is allowed to show
  const canShowNextMonth = () => {
    let newMonthIndex = currentMonthIndex;
    let newYear = currentYear;

    if (newMonthIndex === 11) {
      newMonthIndex = 0;
      newYear += 1;
    } else {
      newMonthIndex += 1;
    }

    return dataExistsForMonth(newMonthIndex, newYear) && !(newYear > currentYearToday || (newYear === currentYearToday && newMonthIndex > currentMonthToday));
  };

  // Check if the previous month is allowed to show
  const canShowPrevMonth = () => {
    let newMonthIndex = currentMonthIndex;
    let newYear = currentYear;

    if (newMonthIndex === 0) {
      newMonthIndex = 11;
      newYear -= 1;
    } else {
      newMonthIndex -= 1;
    }

    return dataExistsForMonth(newMonthIndex, newYear);
  };

  return (
    <View style={styles.container}>
      {/* Month Navigation */}
      <View style={styles.monthNav}>
        {canShowPrevMonth() && (
          <TouchableOpacity onPress={handlePrevMonth}>
            <Text style={styles.navArrow}>{"<"}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.monthText}>{currentMonth}</Text>
        {canShowNextMonth() && (
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.navArrow}>{">"}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Attendance Data */}
      <FlatList
        data={staticData[currentMonth]}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={[styles.status, item.status === 'Present' ? styles.present : styles.absent]}>
                {item.status}
              </Text>
            </View>

            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Text>Check in</Text>
                <Text style={styles.timeText}>{item.checkIn}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text>Check out</Text>
                <Text style={styles.timeText}>{item.checkOut}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text>Total hr</Text>
                <Text style={styles.timeText}>{item.totalHours}</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No data available for this month.</Text>}
      />
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navArrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  present: {
    color: 'green',
  },
  absent: {
    color: 'red',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
