import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HostelCard({ hostel, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{hostel.name}</Text>
      <Text>{hostel.location}</Text>
      <Text>PKR {hostel.price}/month</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
