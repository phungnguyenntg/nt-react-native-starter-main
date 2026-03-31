import { View } from "react-native";
import StarIcon from "@/assets/icons/star-yellow.svg";
import StarOutlineIcon from "@/assets/icons/star-grey.svg";

export const RatingStar = ({ rating }: { rating: number }) => {
  const totalStars = 5;

  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: rating }).map((_, index) => (
        <StarIcon key={`filled-${index}`} testID="filled-star" />
      ))}
      {Array.from({ length: totalStars - rating }).map((_, index) => (
        <StarOutlineIcon key={`empty-${index}`} testID="empty-star" />
      ))}
    </View>
  );
}