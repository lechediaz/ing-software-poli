; Participantes:
;  - Oscar David Diaz
;  - Daniel Ortiz Correa
;  - Joshua Jarid Orbes
;  - Roy Jahns Manotas
;  - Mateo Rojas Trujillo
.model small
.stack 100h

.data
    texto_solicita_cantidad db 13,10,'Ingrese cantidad de numeros a comparar (1-9): $'
    texto_solicita_numero db 13,10,'Ingrese un numero: $'
    texto_mostrar_mayor db 13,10,'Mayor: $'
    texto_mostrar_menor db 13,10,'Menor: $'
    mayor db 0
    menor db 9
    contador db 0

.code
main:
    mov ax, @data
    mov ds, ax      
        
pedir_cantidad:
    ; Mostrar el texto que solicita la cantidad de numeros al usuario
    lea dx, texto_solicita_cantidad
    mov ah, 09h
    int 21h
    
    ; Esperar hasta que el usuario escriba la cantidad de numeros
    mov ah, 01h
    int 21h
    
    ; Convertir de ASCII a numero
    sub al, '0'
    
    ; Si es menor o igual a 0 volver a pedir
    cmp al, 0 
    jle pedir_cantidad  
    
    mov contador, al

    ; Inicializar CX con contador
    mov cx, 0
    mov cl, contador

leer_numeros:
    ; Mostrar texto_solicita_numero
    lea dx, texto_solicita_numero
    mov ah, 09h
    int 21h

    ; Leer el numero
    mov ah, 01h
    int 21h
    
    ; Convertir de ASCII a numero
    sub al, '0'

    ; Comparar con mayor
    cmp al, mayor
    jle verificar_menor
    mov mayor, al

verificar_menor:
    cmp al, menor
    jge continuar
    mov menor, al

continuar:
    loop leer_numeros

    ; Mostrar resultado mayor
    lea dx, texto_mostrar_mayor
    mov ah, 09h
    int 21h
    mov dl, mayor
    add dl, '0'
    mov ah, 02h
    int 21h

    ; Mostrar resultado menor
    lea dx, texto_mostrar_menor
    mov ah, 09h
    int 21h
    mov dl, menor
    add dl, '0'
    mov ah, 02h
    int 21h

    ; Salir
    mov ah, 4Ch
    int 21h
end main
