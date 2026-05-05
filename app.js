const config = window.linkSiteConfig ?? {};

const elements = {
  avatar: document.querySelector("#avatar"),
  bio: document.querySelector("#bio"),
  domain: document.querySelector("#domain"),
  emptyState: document.querySelector("#empty-state"),
  handle: document.querySelector("#handle"),
  links: document.querySelector("#links"),
  name: document.querySelector("#profile-name"),
  sourceLink: document.querySelector("#source-link")
};

const externalLinkRel = "noopener noreferrer";

function setText(element, value) {
  if (!element || !value) {
    return;
  }

  element.textContent = value;
}

function setOptionalLink(element, url) {
  if (!element) {
    return;
  }

  if (!url) {
    element.hidden = true;
    return;
  }

  element.href = url;
}

function getFallbackDescription(url) {
  try {
    return new URL(url).hostname || url;
  } catch {
    return url;
  }
}

function buildLink(link) {
  const anchor = document.createElement("a");
  anchor.className = "link-card";
  anchor.href = link.url;
  anchor.rel = externalLinkRel;
  anchor.target = "_blank";

  const label = document.createElement("span");
  label.className = "link-label";
  label.textContent = link.label;

  const description = document.createElement("span");
  description.className = "link-description";
  description.textContent = link.description ?? getFallbackDescription(link.url);

  anchor.append(label, description);
  return anchor;
}

function renderLinks(links) {
  const validLinks = links.filter((link) => link?.label && link?.url);

  elements.links.replaceChildren(...validLinks.map(buildLink));
  elements.emptyState.hidden = validLinks.length > 0;
}

setText(elements.avatar, config.avatarText);
setText(elements.bio, config.bio);
setText(elements.domain, config.domain);
setText(elements.handle, config.handle);
setText(elements.name, config.name);
setOptionalLink(elements.sourceLink, config.sourceUrl);
renderLinks(Array.isArray(config.links) ? config.links : []);
