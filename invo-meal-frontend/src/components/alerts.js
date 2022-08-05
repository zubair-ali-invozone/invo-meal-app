import swal from 'sweetalert';

export const successAlert = (msg) => {
    swal({
        title: "Congratulations!",
        text: msg,
        icon: "success"
    });
}

export const errorAlert = (msg) => {
    swal({
        title: "Stop!",
        text: msg,
        icon: "error"
    });
}

export const deleteDialogue = () => {
    return swal({
        title: "Are you sure?",
        text: "You will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            return true;
        } else {
            return false;
        }
    });
}

export const confirmDialogue = (msg) => {
    return swal({
        title: "Are you sure?",
        text: msg ?? "Do you want to close POS dashboard",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            return true;
        } else {
            return false;
        }
    });
}