export default async function onOptionChanged(e) {
  if (!e.originalEvent) return;

  let options = await optionsLoad();
  options.enabled = $("#extends-enbaled").prop("checked");
  let newOptions = await odhback().opt_optionsChanged(options);
  optionsSave(newOptions);
}
