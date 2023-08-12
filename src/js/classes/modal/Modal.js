class Modal {
  createModalDialog() {
    const modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog modal-xl");
    return modalDialog;
  }

  createModalContent() {
    const modalContent = document.createElement("form");
    modalContent.setAttribute("class", "modal-content");
    return modalContent;
  }

  createModalContainer(id) {
    const modal = document.createElement("div");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("id", id);
    modal.setAttribute("aria-hidden", "true");
    return modal;
  }

  createHeader(headerTitle) {
    const header = document.createElement("div");

    header.setAttribute("class", "modal-header");

    const title = document.createElement("h5");
    title.setAttribute("class", "modal-title");
    title.innerText = headerTitle;

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("class", "btn-close");
    closeBtn.setAttribute("data-bs-dismiss", "modal");

    header.appendChild(title);
    header.appendChild(closeBtn);
    return header;
  }

  createBody(bodyContent) {
    const body = document.createElement("div");
    body.setAttribute("class", "modal-body");

    body.appendChild(bodyContent);

    return body;
  }

  createFooter() {
    const footer = document.createElement("div");
    footer.setAttribute("class", "modal-footer");
    return footer;
  }

  render(id) {
    const modal = this.createModalContainer(id);
    const modalDialog = this.createModalDialog();
    const modalContent = this.createModalContent();
    modal.appendChild(modalDialog);
    modalDialog.appendChild(modalContent);

    return modal;
  }
}

export default Modal;
