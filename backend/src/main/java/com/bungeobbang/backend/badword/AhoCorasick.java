package com.bungeobbang.backend.badword;

import java.util.*;

public class AhoCorasick {
    private static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        TrieNode failureLink;
        List<String> output = new ArrayList<>();
    }

    private final TrieNode root;

    public AhoCorasick(List<String> keywords) {
        root = new TrieNode();
        buildTrie(keywords);
        buildFailureLinks();
    }

    private void buildTrie(List<String> keywords) {
        for (String keyword : keywords) {
            TrieNode node = root;
            for (char ch : keyword.toCharArray()) {
                node = node.children.computeIfAbsent(ch, k -> new TrieNode());
            }
            node.output.add(keyword);
        }
    }

    private void buildFailureLinks() {
        Queue<TrieNode> queue = new LinkedList<>();
        root.failureLink = root;
        queue.add(root);

        while (!queue.isEmpty()) {
            TrieNode current = queue.poll();
            for (Map.Entry<Character, TrieNode> entry : current.children.entrySet()) {
                char ch = entry.getKey();
                TrieNode child = entry.getValue();
                TrieNode fallback = current.failureLink;

                while (fallback != root && !fallback.children.containsKey(ch)) {
                    fallback = fallback.failureLink;
                }

                if (fallback.children.containsKey(ch) && fallback.children.get(ch) != child) {
                    child.failureLink = fallback.children.get(ch);
                } else {
                    child.failureLink = root;
                }

                child.output.addAll(child.failureLink.output);
                queue.add(child);
            }
        }
    }

    public Map<String, Integer> searchBadWords(String text) {
        Map<String, Integer> foundWords = new HashMap<>();
        TrieNode node = root;

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);

            while (node != root && !node.children.containsKey(ch)) {
                node = node.failureLink;
            }
            node = node.children.getOrDefault(ch, root);

            for (String word : node.output) {
                foundWords.put(word, foundWords.getOrDefault(word, 0) + 1);
            }
        }
        return foundWords;
    }
}
