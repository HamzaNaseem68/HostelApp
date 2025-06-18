import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './context/ThemeContext';
// import { allHostels } from './hostels';

const { width, height } = Dimensions.get('window');

// TODO: Replace with your actual Google Places API key
const GOOGLE_PLACES_API_KEY = 'AIzaSyC9KxpcxtXVb3Qa5Nn5VfEqMRhc-KfJR6c';

const MapScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);

        // Fetch real hostels from Google Places API
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc.coords.latitude},${loc.coords.longitude}&radius=2000&type=lodging&keyword=hostel&key=${GOOGLE_PLACES_API_KEY}`
        );
        const data = await response.json();
        setHostels(data.results || []);
      } catch (error) {
        setErrorMsg('Error getting location or hostels: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}> 
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { 
        backgroundColor: colors.surface,
        paddingTop: insets.top + 10,
        borderBottomColor: colors.border
      }]}> 
        <TouchableOpacity onPress={() => router.back()}> 
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Map View</Text>
        <View style={{ width: 24 }} />
      </View>

      {errorMsg ? (
        <View style={styles.errorContainer}> 
          <Text style={[styles.errorText, { color: colors.error }]}>{errorMsg}</Text>
        </View>
      ) : (
        <View style={styles.mapContainer}> 
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location?.coords?.latitude || 37.7749,
              longitude: location?.coords?.longitude || -122.4194,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {hostels.map((hostel, idx) => (
              <Marker
                key={hostel.place_id || idx}
                coordinate={{
                  latitude: hostel.geometry.location.lat,
                  longitude: hostel.geometry.location.lng,
                }}
                title={hostel.name}
                description={hostel.vicinity}
                onPress={() => setSelectedHostel({
                  name: hostel.name,
                  location: hostel.vicinity,
                  price: '',
                  id: hostel.place_id
                })}
              />
            ))}
          </MapView>
        </View>
      )}

      {selectedHostel && (
        <TouchableOpacity 
          style={[styles.hostelCard, { backgroundColor: colors.surface }]}
          onPress={() => router.push(`/hostelDetail?id=${selectedHostel.id}`)}
        >
          <Text style={[styles.hostelName, { color: colors.text }]}>{selectedHostel.name}</Text>
          <Text style={[styles.hostelLocation, { color: colors.textSecondary }]}>{selectedHostel.location}</Text>
          <Text style={[styles.hostelPrice, { color: colors.primary }]}>{selectedHostel.price}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    width: width,
    height: height,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  hostelCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hostelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hostelLocation: {
    fontSize: 14,
    marginBottom: 5,
  },
  hostelPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MapScreen; 