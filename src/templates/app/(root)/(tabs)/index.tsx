import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/sign-in">
        <Text>Sign In</Text>
      </Link>
      <Link href="/explore">
        <Text>Explore</Text>
      </Link>
      <Link href="/profile">
        <Text>Profile</Text>
      </Link>
      <Link href="/resources/1">
        <Text>Resource</Text>
      </Link>
      <Link href="/profile">
        <Text>Profile</Text>
      </Link>
    </View>
  );
}
