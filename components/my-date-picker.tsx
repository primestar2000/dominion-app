import { ChevronLeft, ChevronRight, CircleChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';

interface DatePickerCustomProps {
  initialDate?: Date;
  onDateChange: (date: Date) => void;
  isOpen: boolean;
  onClose: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  format?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
}

const DatePickerCustom: React.FC<DatePickerCustomProps> = ({
  initialDate = new Date(),
  onDateChange,
  isOpen,
  onClose,
  minimumDate,
  maximumDate,
  containerStyle,
  textStyle,
  modalStyle,
  format = 'MM/DD/YYYY'
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  // const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Date>(initialDate);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateMonthDays = () => {
    const days: number[] = [];
    const daysCount = daysInMonth(tempDate.getMonth(), tempDate.getFullYear());
    for (let i = 1; i <= daysCount; i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateSelect = () => {
    setSelectedDate(tempDate);
    onDateChange(tempDate);
    handleModalClose();
    // setModalVisible(false);
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(tempDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
    setTempDate(newDate);
  };

  const changeDay = (day: number) => {
    const newDate = new Date(tempDate);
    newDate.setDate(day);
    setTempDate(newDate);
  };

  const formatDate = (date: Date) => {
    switch (format) {
      case 'MM/DD/YYYY':
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      case 'DD/MM/YYYY':
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      case 'YYYY-MM-DD':
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleModalClose  = () => {
    onClose();
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity >
        <Text style={textStyle}>{formatDate(selectedDate)}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isOpen}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={[{
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: 'rgba(0,0,0,0.5)'
        }, modalStyle]}>
          <View style={{
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center'
          }}>
            <View style={{
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              width: '100%', 
              marginBottom: 20
            }}>
              <TouchableOpacity style={{padding: 10}} onPress={() => changeMonth('prev')}>
                <ChevronLeft color={"blue"} />
              </TouchableOpacity>
              <Text>{`${monthNames[tempDate.getMonth()]} ${tempDate.getFullYear()}`}</Text>
              <TouchableOpacity style={{padding: 10}} onPress={() => changeMonth('next')}>
                <ChevronRight color={"blue"} />
              </TouchableOpacity>
            </View>

            <View style={{
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              justifyContent: 'center'
            }}>
              {generateMonthDays().map((day) => (
                <TouchableOpacity 
                  key={day} 
                  onPress={() => changeDay(day)}
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: tempDate.getDate() === day ? '#007bff' : 'white'
                  }}
                >
                  <Text style={{
                    color: tempDate.getDate() === day ? 'white' : 'black'
                  }}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              width: '100%', 
              marginTop: 20
            }}>
              <TouchableOpacity 
                onPress={handleModalClose}
                style={{
                  padding: 10,
                  backgroundColor: '#dc3545',
                  borderRadius: 5
                }}
              >
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleDateSelect}
                style={{
                  padding: 10,
                  backgroundColor: '#28a745',
                  borderRadius: 5
                }}
              >
                <Text style={{color: 'white'}}>Select</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerCustom