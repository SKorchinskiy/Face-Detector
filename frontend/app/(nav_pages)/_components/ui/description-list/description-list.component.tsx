import Description, {
  DescriptionProps,
} from "../description/description.component";

export default function DescriptionList({
  list,
}: {
  list: Array<DescriptionProps>;
}) {
  return (
    <>
      {list.map((element, index) => (
        <Description key={index} {...element} />
      ))}
    </>
  );
}
