// This file was auto-generated by Fern from our API Definition.

package api

import (
	fmt "fmt"
)

type Bar struct {
	Id      *Id      `json:"id,omitempty"`
	Name    *string  `json:"name,omitempty"`
	List    *string  `json:"list,omitempty"`
	Type    *FooType `json:"type,omitempty"`
	Request *Request `json:"request,omitempty"`
	Delay   *string  `json:"delay,omitempty"`
}

type Baz struct {
	Id          *Id     `json:"id,omitempty"`
	Name        *string `json:"name,omitempty"`
	List        *string `json:"list,omitempty"`
	Description *string `json:"description,omitempty"`
	// This field has documentation, so it should be rendered
	// just above the field.
	// Note: Newlines should be preserved.
	HasDocs *string `json:"hasDocs,omitempty"`
}

type Error struct {
	Message   *string  `json:"message,omitempty"`
	Recursive []*Error `json:"recursive,omitempty"`
}

type Foo struct {
	Id      *Id      `json:"id,omitempty"`
	Name    *string  `json:"name,omitempty"`
	List    *string  `json:"list,omitempty"`
	Type    *FooType `json:"type,omitempty"`
	Request *Request `json:"request,omitempty"`
	Delay   *string  `json:"delay,omitempty"`
}

type FooType string

const (
	FooTypeOne   FooType = "one"
	FooTypeTwo   FooType = "two"
	FooTypeThree FooType = "three"
	FooTypeFour  FooType = "four"
)

func NewFooTypeFromString(s string) (FooType, error) {
	switch s {
	case "one":
		return FooTypeOne, nil
	case "two":
		return FooTypeTwo, nil
	case "three":
		return FooTypeThree, nil
	case "four":
		return FooTypeFour, nil
	}
	var t FooType
	return "", fmt.Errorf("%s is not a valid %T", s, t)
}

func (f FooType) Ptr() *FooType {
	return &f
}

type Request struct {
	Url      string                 `json:"url"`
	Headers  map[string]interface{} `json:"headers,omitempty"`
	Body     *string                `json:"body,omitempty"`
	Platform *string                `json:"platform,omitempty"`
	Unknown  interface{}            `json:"unknown,omitempty"`
}

type Id = string
