import { Image, Text, View } from "react-native";
export interface UserInfo {
  name: string;
  mssv: string;
  uriImage: string | any;
}
const InfoRow = ({ name, mssv, uriImage }: UserInfo) => {
  // Determine if uriImage is a remote URL (string) or a local require asset
  const imageSource =
    typeof uriImage === "string" ? { uri: uriImage } : uriImage;
  return (
    <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
      <View style={{ width: "30%" }}>
        <Image
          source={imageSource || require("../assets/images/react-logo.png")}
        />
      </View>
      <View style={{ width: "70%", paddingLeft: 10 }}>
        <Text style={{ fontSize: 32 }}>{name}</Text>
        <Text style={{ fontSize: 16, color: "gray" }}>MSSV: {mssv}</Text>
      </View>
    </View>
  );
};
export default InfoRow;
