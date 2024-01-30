export const EDITOR_INIT = {
    plugins: 'mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    width: '100%',
    height: "600px",
    MediaDevices: true,
    mergetags_list: [
        { value: 'First.Name', title: 'First Name' },
        { value: 'Email', title: 'Email' },
    ],
    skin: 'oxide-dark',
    language: 'en',
    content_css: 'dark',
};
