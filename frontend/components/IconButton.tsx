import { TouchableOpacity } from "react-native";

export default function IconButton({
  icon,
  onPress,
}: {
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={10}>
      {icon}
    </TouchableOpacity>
  );
}
