import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

export default function App() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // ===== Validate số điện thoại VN (10 số, bắt đầu bằng 0) =====
  const validatePhone = (number) => {
    const regex = /^0\d{9}$/;
    return regex.test(number.replace(/\s/g, ""));
  };

  // ===== Format tự động 093 123 45 67 =====
  const formatPhone = (value) => {
    // Xóa hết ký tự không phải số
    const cleaned = value.replace(/\D/g, "");

    let formatted = cleaned;

    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = cleaned.slice(0, 3) + " " + cleaned.slice(3);
    } else if (cleaned.length > 6) {
      formatted =
        cleaned.slice(0, 3) +
        " " +
        cleaned.slice(3, 6) +
        " " +
        cleaned.slice(6, 8) +
        " " +
        cleaned.slice(8, 10);
    }

    return formatted;
  };

  // ===== Khi nhập =====
  const handleChangeText = (value) => {
    const formatted = formatPhone(value);
    setPhone(formatted);

    // Validation realtime
    if (!validatePhone(formatted) && formatted.length >= 10) {
      setError("Số điện thoại không đúng định dạng");
    } else {
      setError("");
    }
  };

  // ===== Khi click Tiếp tục =====
  const handleSubmit = () => {
    if (!validatePhone(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không đúng định dạng. Vui lòng nhập lại");
      return;
    }

    Alert.alert("Thành công", "Số điện thoại hợp lệ!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="numeric"
        value={phone}
        onChangeText={handleChangeText}
        maxLength={13}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});